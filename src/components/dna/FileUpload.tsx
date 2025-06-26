import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface FileUploadProps {
  onUpload: () => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      setIsProcessing(true);
      
      // Simulate DNA processing
      setTimeout(() => {
        setAnalysisResults({
          totalMarkers: Math.floor(Math.random() * 500000) + 500000,
          confidence: Math.floor(Math.random() * 15) + 85,
          tribalMatches: Math.floor(Math.random() * 8) + 3,
        });
        setIsProcessing(false);
        onUpload();
      }, 3000);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'text/csv': ['.csv'],
      'application/json': ['.json'],
    },
    maxFiles: 1,
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-african-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="text-african-earth" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-african-earth mb-4">Upload Your DNA Data</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload your raw DNA data from 23andMe, AncestryDNA, or other providers to discover your African heritage. 
            We'll analyze your genetic markers to find tribal connections and ancestral origins.
          </p>
        </div>

        {!uploadedFile ? (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-african-gold bg-african-gold/5'
                : 'border-gray-300 hover:border-african-gold hover:bg-african-gold/5'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto mb-4 text-gray-400" size={48} />
            {isDragActive ? (
              <p className="text-lg text-african-earth">Drop your DNA file here...</p>
            ) : (
              <div>
                <p className="text-lg text-gray-600 mb-2">
                  Drag & drop your DNA file here, or click to select
                </p>
                <p className="text-sm text-gray-500">
                  Supports: .txt, .csv, .json files from major DNA testing companies
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* File Info */}
            <div className="bg-african-gold/10 rounded-lg p-4 flex items-center space-x-3">
              <FileText className="text-african-earth" size={24} />
              <div>
                <p className="font-semibold text-african-earth">{uploadedFile.name}</p>
                <p className="text-sm text-gray-600">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <CheckCircle className="text-green-600 ml-auto" size={20} />
            </div>

            {/* Processing Status */}
            {isProcessing ? (
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <Loader className="animate-spin mx-auto mb-4 text-blue-600" size={32} />
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Analyzing Your DNA</h3>
                <p className="text-blue-700">
                  Processing genetic markers and comparing with African tribal databases...
                </p>
                <div className="mt-4 w-full bg-blue-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '65%' }}></div>
                </div>
              </div>
            ) : analysisResults ? (
              <div className="bg-green-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <CheckCircle className="text-green-600 mr-3" size={24} />
                  <h3 className="text-lg font-semibold text-green-900">Analysis Complete!</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-african-earth">
                      {analysisResults.totalMarkers.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">Genetic Markers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-african-earth">{analysisResults.confidence}%</p>
                    <p className="text-sm text-gray-600">Confidence Level</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-african-earth">{analysisResults.tribalMatches}</p>
                    <p className="text-sm text-gray-600">Tribal Matches</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => window.location.hash = '#matches'}
                    className="bg-african-gold text-african-earth px-6 py-3 rounded-lg font-semibold hover:bg-african-gold/90 transition-colors"
                  >
                    View Your Results
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* Privacy Notice */}
        <div className="mt-8 bg-gray-50 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="text-gray-500 flex-shrink-0 mt-1" size={20} />
          <div className="text-sm text-gray-600">
            <p className="font-semibold mb-1">Privacy & Security</p>
            <p>
              Your DNA data is processed locally and securely. We do not store or share your genetic information. 
              All analysis is performed using anonymized comparison databases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
