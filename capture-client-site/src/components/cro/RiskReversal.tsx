"use client";

export default function RiskReversal() {
  return (
    <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-2 border-green-500/30 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Shield icon */}
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500/40 mb-4">
        <span className="material-icons text-green-400 text-5xl">verified_user</span>
      </div>

      {/* Headline */}
      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
        100% Risk-Free Guarantee
      </h3>

      {/* Description */}
      <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
        Try Capture Client for 30 days. If you don't see more leads and better ROI,
        we'll refund every penny. No questions asked.
      </p>

      {/* Benefits */}
      <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
          <span className="material-icons text-green-500 text-lg">check_circle</span>
          <span>30-Day Money Back</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
          <span className="material-icons text-green-500 text-lg">check_circle</span>
          <span>Cancel Anytime</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
          <span className="material-icons text-green-500 text-lg">check_circle</span>
          <span>No Setup Fees</span>
        </div>
      </div>

      {/* Fine print */}
      <p className="text-xs text-gray-500 mt-6">
        Your satisfaction is our priority. We're confident you'll love the results.
      </p>
    </div>
  );
}
