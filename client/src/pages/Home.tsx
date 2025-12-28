import { useEffect, useRef, useState } from 'react';
import { Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ApplicantPrintCard } from '@/components/ApplicantPrintCard';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/_core/hooks/useAuth';

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
  const { user } = useAuth();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  // Fetch applicants from database
  const { data: dbApplicants, isLoading } = trpc.applicants.list.useQuery(undefined, {
    enabled: !!user,
  });

  useEffect(() => {
    if (dbApplicants) {
      setApplicants(dbApplicants);
      if (dbApplicants.length > 0) {
        setSelectedApplicant(dbApplicants[0]);
      }
    }
  }, [dbApplicants]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0F3460] mx-auto mb-4"></div>
          <p className="text-slate-600">Loading applicants...</p>
        </div>
      </div>
    );
  }

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
              <div ref={printRef} className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
                <ApplicantPrintCard applicant={selectedApplicant} />
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
