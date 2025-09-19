import { CreditCard } from "lucide-react";

const IndexPolaris = () => {
  const handleSubscriptionApproval = () => {
    // This would redirect to Shopify's native subscription approval page
    // For now, we'll simulate and go to tutorial
    window.location.href = '/tutorial';
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="logo-container">
          <div className="logo-circle">
            <CreditCard style={{ width: '32px', height: '32px', color: '#FFFFFF' }} />
          </div>
        </div>
        
        <h1 className="main-heading">
          Welcome to iceep
        </h1>
        
        <p className="subtitle">
          Start your trade-in program and boost customer engagement with sustainable shopping options.
        </p>
        
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Start Your Free Trial</h2>
            <p className="card-description">
              Approve your subscription to begin setting up your trade-in program. You'll get 14 days free to try all features.
            </p>
          </div>
          <div className="card-content">
            <button 
              className="primary-button"
              onClick={handleSubscriptionApproval}
            >
              Approve Subscription & Continue
            </button>
          </div>
        </div>
        
        <p className="support-text">
          Need help? Contact us at{" "}
          <a href="mailto:support@iceep.io" className="support-link">
            support@iceep.io
          </a>
        </p>
      </div>
    </div>
  );
};

export default IndexPolaris;