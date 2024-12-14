'use client'

import { ChevronLeft, ChevronRight, X, Download } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface PDFPreviewProps {
  fileName: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onClose?: () => void;
  onDownload: () => void;
  isDownloadReady: boolean;
  children?: React.ReactNode;
}

export function PDFPreview({ 
  fileName, 
  currentPage, 
  totalPages, 
  onPageChange,
  onClose,
  onDownload,
  isDownloadReady,
  children 
}: PDFPreviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="bg-gray-100 p-1 rounded">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 18H17V16H7V18Z"
                fill="currentColor"
              />
              <path
                d="M17 14H7V12H17V14Z"
                fill="currentColor"
              />
              <path
                d="M7 10H11V8H7V10Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <span className="font-medium">{fileName}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onDownload}
            disabled={!isDownloadReady}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto relative">
        {children}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-4 border-t">
        <div className="text-sm text-gray-600">
          Page <span className="font-medium">{currentPage}</span> / {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

