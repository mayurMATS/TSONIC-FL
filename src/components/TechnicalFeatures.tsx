export default function TechnicalFeatures() {
  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">Technical Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">High-Quality Audio</h3>
            <p className="text-gray-600">Experience crystal-clear sound with our advanced audio processing technology.</p>
          </div>
          <div className="p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Cross-Platform Support</h3>
            <p className="text-gray-600">Listen to your favorite music on any device, anywhere, anytime.</p>
          </div>
          <div className="p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Smart Playlists</h3>
            <p className="text-gray-600">Let our AI create the perfect playlist based on your listening habits.</p>
          </div>
          <div className="p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Offline Mode</h3>
            <p className="text-gray-600">Download your music for offline listening when you're on the go.</p>
          </div>
          <div className="p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Cloud Sync</h3>
            <p className="text-gray-600">Your music library stays in sync across all your devices automatically.</p>
          </div>
          <div className="p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Advanced Equalizer</h3>
            <p className="text-gray-600">Fine-tune your listening experience with our professional-grade equalizer.</p>
          </div>
        </div>
      </div>
    </section>
  );
} 