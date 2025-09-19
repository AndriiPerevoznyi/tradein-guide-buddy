import { CreditCard } from "lucide-react";

const IndexPolaris = () => {
  const handleSubscriptionApproval = () => {
    // This would redirect to Shopify's native subscription approval page
    // For now, we'll simulate and go to tutorial
    window.location.href = '/tutorial';
  };

  return (
    <div className="Polaris-Page">
      <div className="Polaris-Layout">
        <div className="Polaris-Layout__Section">
          <div style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '2rem'
          }}>
            <div style={{ maxWidth: '32rem', textAlign: 'center' }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                backgroundColor: '#E3F2FD',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <CreditCard style={{ width: '2rem', height: '2rem', color: '#00A047' }} />
              </div>
              
              <div className="Polaris-DisplayText Polaris-DisplayText--sizeExtraLarge">
                Welcome to iceep
              </div>
              
              <div className="Polaris-TextStyle--variationSubdued" style={{ 
                fontSize: '1.125rem', 
                marginBottom: '2rem', 
                marginTop: '1rem' 
              }}>
                Start your trade-in program and boost customer engagement with sustainable shopping options.
              </div>
              
              <div className="Polaris-Card">
                <div className="Polaris-Card__Header">
                  <h2 className="Polaris-Heading">Start Your Free Trial</h2>
                </div>
                <div className="Polaris-Card__Section">
                  <p className="Polaris-TextStyle--variationSubdued" style={{ marginBottom: '1rem' }}>
                    Approve your subscription to begin setting up your trade-in program. You'll get 14 days free to try all features.
                  </p>
                  
                  <button 
                    className="Polaris-Button Polaris-Button--primary Polaris-Button--sizeSlim"
                    onClick={handleSubscriptionApproval}
                    style={{ width: '100%' }}
                  >
                    <span className="Polaris-Button__Content">
                      <span className="Polaris-Button__Text">Approve Subscription & Continue</span>
                    </span>
                  </button>
                </div>
              </div>
              
              <p className="Polaris-Caption" style={{ marginTop: '1.5rem' }}>
                Need help? Contact us at{" "}
                <a href="mailto:support@iceep.io" className="Polaris-Link">
                  support@iceep.io
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPolaris;