import { useEffect, useRef, useState } from 'react';
import { Printer, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import applicantsData from '@/data/applicants.json';

interface Applicant {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  jobTitle: string;
  platform: string;
}

/**
 * HVAC Applicants Portal - Home Page
 * 
 * Design Philosophy: Professional Corporate with Technical Elegance
 * - Navy Blue (#0F3460) + Cyan (#00D9FF) color scheme
 * - Poppins (headers) + Inter (body) typography
 * - A4 print-optimized card layout
 * - Asymmetric design with Van Tech branding
 */
export default function Home() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setApplicants(applicantsData);
    if (applicantsData.length > 0) {
      setSelectedApplicant(applicantsData[0]);
    }
  }, []);

  const handlePrint = () => {
    if (selectedApplicant && printRef.current) {
      const printWindow = window.open('', '', 'width=800,height=600');
      if (printWindow) {
        const printContent = printRef.current.innerHTML;
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <title>Applicant - ${selectedApplicant.fullName}</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
              
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              
              body {
                font-family: 'Inter', sans-serif;
                background: white;
                color: #1A1A1A;
              }
              
              @page {
                size: A4;
                margin: 0;
              }
              
              .print-page {
                width: 210mm;
                height: 297mm;
                padding: 1rem;
                background: white;
                page-break-after: always;
              }
              
              .print-page:last-child {
                page-break-after: avoid;
              }
              
              h1, h2, h3 {
                font-family: 'Poppins', sans-serif;
                font-weight: 700;
              }
              
              .no-print {
                display: none !important;
              }
            </style>
          </head>
          <body>
            ${printContent}
          </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const getPlatformLabel = (platform: string) => {
    const labels: { [key: string]: string } = {
      fb: 'Facebook',
      ig: 'Instagram',
      organic: 'Organic'
    };
    return labels[platform] || platform.toUpperCase();
  };

  const getPlatformColor = (platform: string) => {
    const colors: { [key: string]: string } = {
      fb: 'bg-blue-100 text-blue-800',
      ig: 'bg-pink-100 text-pink-800',
      organic: 'bg-green-100 text-green-800'
    };
    return colors[platform] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header with Van Tech Branding */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm no-print">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/images/van-tech-logo.png" 
              alt="Van Tech Logo" 
              className="h-12 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold text-[#0F3460]">HVAC Applicants Portal</h1>
              <p className="text-sm text-slate-500">Van Tech Contracting</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handlePrint}
              variant="outline"
              className="gap-2 border-[#0F3460] text-[#0F3460] hover:bg-[#0F3460] hover:text-white"
            >
              <Printer className="w-4 h-4" />
              Print A4
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Applicants List */}
          <aside className="lg:col-span-1 no-print">
            <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-[#0F3460] to-[#1a4d7a] text-white px-4 py-3">
                <h2 className="font-bold text-sm">Applicants ({applicants.length})</h2>
              </div>
              <div className="divide-y max-h-[calc(100vh-200px)] overflow-y-auto">
                {applicants.map((applicant) => (
                  <button
                    key={applicant.id}
                    onClick={() => setSelectedApplicant(applicant)}
                    className={`w-full text-left px-4 py-3 transition-all duration-200 hover:bg-slate-50 ${
                      selectedApplicant?.id === applicant.id
                        ? 'bg-[#00D9FF] bg-opacity-10 border-l-4 border-[#00D9FF]'
                        : 'border-l-4 border-transparent'
                    }`}
                  >
                    <p className="font-medium text-sm text-slate-900 truncate">
                      {applicant.fullName}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {applicant.jobTitle}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content - Applicant Card */}
          <main className="lg:col-span-3">
            {selectedApplicant && (
              <div
                ref={printRef}
                className="print-page bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden"
              >
                {/* Print Page Container */}
                <div className="p-8 min-h-[297mm] flex flex-col justify-between bg-white">
                  {/* Header Section */}
                  <div>
                    {/* Van Tech Logo */}
                    <div className="mb-8 pb-6 border-b-2 border-[#00D9FF]">
                      <img
                        src="/images/van-tech-logo.png"
                        alt="Van Tech Logo"
                        className="h-16 object-contain"
                      />
                    </div>

                    {/* Title */}
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-[#0F3460] mb-2">
                        Applicant Profile
                      </h2>
                      <p className="text-sm text-slate-500">
                        Position: HVAC MAINTENANCE ENGINEER
                      </p>
                    </div>

                    {/* Applicant Information */}
                    <div className="space-y-6 mb-8">
                      {/* Name Section */}
                      <div className="bg-gradient-to-r from-[#0F3460] to-[#1a4d7a] rounded-lg p-6 text-white">
                        <p className="text-xs font-semibold text-[#00D9FF] uppercase tracking-wide mb-2">
                          Full Name
                        </p>
                        <h3 className="text-2xl font-bold">{selectedApplicant.fullName}</h3>
                      </div>

                      {/* Contact Information Grid */}
                      <div className="grid grid-cols-2 gap-6">
                        {/* Phone */}
                        <div className="border-l-4 border-[#00D9FF] pl-4">
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                            Phone
                          </p>
                          <p className="text-lg font-medium text-slate-900 mono">
                            {selectedApplicant.phone}
                          </p>
                        </div>

                        {/* Email */}
                        <div className="border-l-4 border-[#00D9FF] pl-4">
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                            Email
                          </p>
                          <p className="text-sm font-medium text-slate-900 break-all">
                            {selectedApplicant.email}
                          </p>
                        </div>
                      </div>

                      {/* Job Title and Platform */}
                      <div className="grid grid-cols-2 gap-6">
                        {/* Job Title */}
                        <div className="border-l-4 border-[#00D9FF] pl-4">
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                            Current Job Title
                          </p>
                          <p className="text-lg font-medium text-slate-900">
                            {selectedApplicant.jobTitle}
                          </p>
                        </div>

                        {/* Platform */}
                        <div className="border-l-4 border-[#00D9FF] pl-4">
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                            Application Source
                          </p>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getPlatformColor(selectedApplicant.platform)}`}>
                            {getPlatformLabel(selectedApplicant.platform)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Section */}
                  <div className="pt-8 border-t-2 border-slate-200 flex items-center justify-center gap-2">
                    <span className="text-xs text-slate-500">Powered By</span>
                    <img
                      src="/images/omar-tech-logo.png"
                      alt="Omar Technology"
                      className="h-6 object-contain"
                    />
                  </div>
                </div>
              </div>
            )}

            {!selectedApplicant && (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <p className="text-slate-500">Select an applicant to view details</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
