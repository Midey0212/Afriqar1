import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Plus, Edit, Trash2, Users, Calendar, MapPin } from 'lucide-react';

interface FamilyMember {
  id: string;
  name: string;
  birth: string;
  death?: string;
  location: string;
  relation: string;
  generation: number;
  tribalAffiliation?: string;
  notes?: string;
}

interface SortableMemberProps {
  member: FamilyMember;
  onEdit: (member: FamilyMember) => void;
  onDelete: (id: string) => void;
}

const SortableMember: React.FC<SortableMemberProps> = ({ member, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: member.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const generationColors = {
    1: 'bg-african-gold/20 border-african-gold',
    2: 'bg-african-terracotta/20 border-african-terracotta',
    3: 'bg-african-forest/20 border-african-forest',
    4: 'bg-african-sunset/20 border-african-sunset',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-4 rounded-lg border-2 cursor-move transition-colors ${
        generationColors[member.generation as keyof typeof generationColors] || 'bg-gray-100 border-gray-300'
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold text-african-earth">{member.name}</h4>
          <p className="text-sm text-gray-600">{member.relation}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(member);
            }}
            className="text-gray-500 hover:text-african-gold"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(member.id);
            }}
            className="text-gray-500 hover:text-red-500"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-1 text-sm text-gray-600">
        <p className="flex items-center">
          <Calendar size={14} className="mr-1" />
          {member.birth} {member.death && `- ${member.death}`}
        </p>
        <p className="flex items-center">
          <MapPin size={14} className="mr-1" />
          {member.location}
        </p>
        {member.tribalAffiliation && (
          <p className="text-african-earth font-medium">
            Tribal: {member.tribalAffiliation}
          </p>
        )}
      </div>
    </div>
  );
};

export const FamilyTree: React.FC = () => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: '1',
      name: 'John Doe',
      birth: '1940',
      location: 'New York, USA',
      relation: 'Self',
      generation: 1,
      tribalAffiliation: 'Yoruba',
    },
    {
      id: '2',
      name: 'Mary Johnson',
      birth: '1918',
      death: '1995',
      location: 'Georgia, USA',
      relation: 'Mother',
      generation: 2,
      tribalAffiliation: 'Igbo',
    },
    {
      id: '3',
      name: 'Robert Doe',
      birth: '1915',
      death: '1988',
      location: 'South Carolina, USA',
      relation: 'Father',
      generation: 2,
      tribalAffiliation: 'Akan',
    },
  ]);

  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [showForm, setShowForm] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setFamilyMembers((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddMember = () => {
    setEditingMember({
      id: Date.now().toString(),
      name: '',
      birth: '',
      location: '',
      relation: '',
      generation: 1,
    });
    setShowForm(true);
  };

  const handleEditMember = (member: FamilyMember) => {
    setEditingMember(member);
    setShowForm(true);
  };

  const handleSaveMember = (memberData: FamilyMember) => {
    if (familyMembers.find(m => m.id === memberData.id)) {
      setFamilyMembers(prev => prev.map(m => m.id === memberData.id ? memberData : m));
    } else {
      setFamilyMembers(prev => [...prev, memberData]);
    }
    setShowForm(false);
    setEditingMember(null);
  };

  const handleDeleteMember = (id: string) => {
    setFamilyMembers(prev => prev.filter(m => m.id !== id));
  };

  const groupedByGeneration = familyMembers.reduce((acc, member) => {
    if (!acc[member.generation]) {
      acc[member.generation] = [];
    }
    acc[member.generation].push(member);
    return acc;
  }, {} as Record<number, FamilyMember[]>);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
        <div className="bg-african-earth text-african-ivory p-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center mb-2">
                <Users className="mr-3" size={24} />
                <h2 className="text-2xl font-bold">Family Tree Builder</h2>
              </div>
              <p className="text-african-ivory/90">
                Create and organize your family history with drag-and-drop functionality
              </p>
            </div>
            <button
              onClick={handleAddMember}
              className="bg-african-gold text-african-earth px-4 py-2 rounded-lg font-semibold hover:bg-african-gold/90 transition-colors flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Add Member</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Generation Legend */}
          <div className="mb-6 flex flex-wrap gap-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-african-gold/20 border-2 border-african-gold rounded mr-2"></div>
              <span className="text-sm text-gray-600">Generation 1 (Self)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-african-terracotta/20 border-2 border-african-terracotta rounded mr-2"></div>
              <span className="text-sm text-gray-600">Generation 2 (Parents)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-african-forest/20 border-2 border-african-forest rounded mr-2"></div>
              <span className="text-sm text-gray-600">Generation 3 (Grandparents)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-african-sunset/20 border-2 border-african-sunset rounded mr-2"></div>
              <span className="text-sm text-gray-600">Generation 4+ (Great-grandparents)</span>
            </div>
          </div>

          {/* Family Tree */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div className="space-y-8">
              {Object.entries(groupedByGeneration)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([generation, members]) => (
                  <div key={generation}>
                    <h3 className="text-lg font-semibold text-african-earth mb-4">
                      Generation {generation}
                    </h3>
                    <SortableContext
                      items={members.map(m => m.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {members.map((member) => (
                          <SortableMember
                            key={member.id}
                            member={member}
                            onEdit={handleEditMember}
                            onDelete={handleDeleteMember}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </div>
                ))}
            </div>
          </DndContext>

          {familyMembers.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-600 mb-4">No family members added yet</p>
              <button
                onClick={handleAddMember}
                className="bg-african-gold text-african-earth px-6 py-3 rounded-lg font-semibold hover:bg-african-gold/90 transition-colors"
              >
                Add Your First Family Member
              </button>
            </div>
          )}
        </div>

        {/* Edit Form Modal */}
        {showForm && editingMember && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-african-earth mb-4">
                {familyMembers.find(m => m.id === editingMember.id) ? 'Edit' : 'Add'} Family Member
              </h3>
              
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveMember(editingMember);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={editingMember.name}
                    onChange={(e) => setEditingMember({...editingMember, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-african-gold"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Birth Year</label>
                    <input
                      type="text"
                      value={editingMember.birth}
                      onChange={(e) => setEditingMember({...editingMember, birth: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-african-gold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Death Year</label>
                    <input
                      type="text"
                      value={editingMember.death || ''}
                      onChange={(e) => setEditingMember({...editingMember, death: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-african-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={editingMember.location}
                    onChange={(e) => setEditingMember({...editingMember, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-african-gold"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Relation</label>
                    <select
                      value={editingMember.relation}
                      onChange={(e) => setEditingMember({...editingMember, relation: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-african-gold"
                      required
                    >
                      <option value="">Select relation</option>
                      <option value="Self">Self</option>
                      <option value="Mother">Mother</option>
                      <option value="Father">Father</option>
                      <option value="Grandmother">Grandmother</option>
                      <option value="Grandfather">Grandfather</option>
                      <option value="Great-grandmother">Great-grandmother</option>
                      <option value="Great-grandfather">Great-grandfather</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Child">Child</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Generation</label>
                    <select
                      value={editingMember.generation}
                      onChange={(e) => setEditingMember({...editingMember, generation: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-african-gold"
                      required
                    >
                      <option value={1}>1 (Self)</option>
                      <option value={2}>2 (Parents)</option>
                      <option value={3}>3 (Grandparents)</option>
                      <option value={4}>4 (Great-grandparents)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tribal Affiliation</label>
                  <input
                    type="text"
                    value={editingMember.tribalAffiliation || ''}
                    onChange={(e) => setEditingMember({...editingMember, tribalAffiliation: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-african-gold"
                    placeholder="e.g., Yoruba, Igbo, Akan"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-african-gold text-african-earth px-4 py-2 rounded-md font-semibold hover:bg-african-gold/90"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
