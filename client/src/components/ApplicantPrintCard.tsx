import React from 'react';

interface Applicant {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  jobTitle: string;
  platform: string;
}

interface ApplicantPrintCardProps {
  applicant: Applicant;
  forwardRef?: React.Ref<HTMLDivElement>;
}

/**
 * Professional A4 Print Card Component
 * Optimized for printing with modern, attractive design
 */
export const ApplicantPrintCard = React.forwardRef<HTMLDivElement, Omit<ApplicantPrintCardProps, 'forwardRef'>>(
  ({ applicant }, ref) => {
    const getPlatformLabel = (platform: string) => {
      const labels: { [key: string]: string } = {
        fb: 'Facebook',
        ig: 'Instagram',
        organic: 'Organic'
      };
      return labels[platform] || platform.toUpperCase();
    };

    const getPlatformIcon = (platform: string) => {
      const icons: { [key: string]: string } = {
        fb: '📱',
        ig: '📸',
        organic: '✨'
      };
      return icons[platform] || '•';
    };

    return (
      <div
        ref={ref}
        className="print-page bg-white overflow-hidden"
        style={{
          width: '210mm',
          height: '297mm',
          padding: '2rem',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          pageBreakAfter: 'always',
        }}
      >
        {/* Top Decorative Line */}
        <div
          style={{
            height: '4px',
            background: 'linear-gradient(90deg, #0F3460 0%, #00D9FF 50%, #0F3460 100%)',
            marginBottom: '2rem',
            borderRadius: '2px',
          }}
        />

        {/* Header Section */}
        <div style={{ marginBottom: '2rem' }}>
          {/* Van Tech Logo */}
          <div style={{ marginBottom: '1.5rem' }}>
            <img
              src="/images/van-tech-logo.png"
              alt="Van Tech Logo"
              style={{ height: '50px', objectFit: 'contain' }}
            />
          </div>

          {/* Title */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h1
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#0F3460',
                margin: '0 0 0.5rem 0',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              Applicant Profile
            </h1>
            <p
              style={{
                fontSize: '12px',
                color: '#4A5568',
                margin: 0,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Position: HVAC MAINTENANCE ENGINEER
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, marginBottom: '2rem' }}>
          {/* Name Card - Premium Design */}
          <div
            style={{
              background: 'linear-gradient(135deg, #0F3460 0%, #1a4d7a 100%)',
              borderRadius: '8px',
              padding: '1.5rem',
              color: 'white',
              marginBottom: '1.5rem',
              boxShadow: '0 4px 15px rgba(15, 52, 96, 0.15)',
            }}
          >
            <p
              style={{
                fontSize: '10px',
                fontWeight: 600,
                color: '#00D9FF',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                margin: '0 0 0.5rem 0',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Full Name
            </p>
            <h2
              style={{
                fontSize: '26px',
                fontWeight: 700,
                margin: 0,
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              {applicant.fullName}
            </h2>
          </div>

          {/* Contact Information Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem',
              marginBottom: '1.5rem',
            }}
          >
            {/* Phone */}
            <div
              style={{
                borderLeft: '4px solid #00D9FF',
                paddingLeft: '1rem',
              }}
            >
              <p
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  color: '#4A5568',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  margin: '0 0 0.5rem 0',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Phone
              </p>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#1A1A1A',
                  margin: 0,
                  fontFamily: 'IBM Plex Mono, monospace',
                }}
              >
                {applicant.phone}
              </p>
            </div>

            {/* Email */}
            <div
              style={{
                borderLeft: '4px solid #00D9FF',
                paddingLeft: '1rem',
              }}
            >
              <p
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  color: '#4A5568',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  margin: '0 0 0.5rem 0',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Email
              </p>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#1A1A1A',
                  margin: 0,
                  wordBreak: 'break-all',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {applicant.email}
              </p>
            </div>
          </div>

          {/* Job Title and Platform */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem',
            }}
          >
            {/* Job Title */}
            <div
              style={{
                borderLeft: '4px solid #00D9FF',
                paddingLeft: '1rem',
              }}
            >
              <p
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  color: '#4A5568',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  margin: '0 0 0.5rem 0',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Current Job Title
              </p>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#1A1A1A',
                  margin: 0,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {applicant.jobTitle}
              </p>
            </div>

            {/* Platform */}
            <div
              style={{
                borderLeft: '4px solid #00D9FF',
                paddingLeft: '1rem',
              }}
            >
              <p
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  color: '#4A5568',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  margin: '0 0 0.5rem 0',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Application Source
              </p>
              <div
                style={{
                  display: 'inline-block',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 600,
                  background: '#E8EEF5',
                  color: '#0F3460',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {getPlatformIcon(applicant.platform)} {getPlatformLabel(applicant.platform)}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div>
          {/* Bottom Decorative Line */}
          <div
            style={{
              height: '2px',
              background: '#E8EEF5',
              marginBottom: '1rem',
            }}
          />

          {/* Powered By */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            <span
              style={{
                fontSize: '10px',
                color: '#4A5568',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Powered By
            </span>
            <img
              src="/images/omar-tech-logo.png"
              alt="Omar Technology"
              style={{ height: '20px', objectFit: 'contain' }}
            />
          </div>

          {/* Document Info */}
          <p
            style={{
              fontSize: '8px',
              color: '#A0AEC0',
              textAlign: 'center',
              margin: '0.5rem 0 0 0',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Van Tech Contracting © {new Date().getFullYear()} | HVAC Applicants Portal
          </p>
        </div>
      </div>
    );
  }
);

ApplicantPrintCard.displayName = 'ApplicantPrintCard';
