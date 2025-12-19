import { Compass, MapPin, ShieldCheck, Headset, ArrowRight } from 'lucide-react';

interface ServiceAreaMapProps {
  city: string;
  state: string;
  stateAbbr: string;
  serviceAreaRadius: string;
  nearbyAreas: string[];
  areasList: string[];
}

export default function ServiceAreaMap({
  city,
  state,
  stateAbbr,
  serviceAreaRadius,
  nearbyAreas,
  areasList,
}: ServiceAreaMapProps) {
  // Combine nearby areas and areas list, deduplicate
  const allAreas = Array.from(new Set([...nearbyAreas, ...areasList])).filter(Boolean);

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16 bg-slate-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-400/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/30 mb-6">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider">
              Service Coverage Area
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
            Serving {city} and{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-cyan-700">
              Surrounding Areas
            </span>
          </h2>
          <p className="text-slate-700 text-base sm:text-lg max-w-2xl mx-auto">
            Full Voice AI coverage within {serviceAreaRadius} of {city}, {stateAbbr}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-center">
          {/* Visual Map Representation */}
          <div className="relative">
            <div className="absolute -inset-px bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-cyan-400/20 rounded-2xl blur-xl opacity-50" />
            <div className="relative bg-white/70 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-8 sm:p-10">
              {/* Central City Marker */}
              <div className="relative flex items-center justify-center aspect-square">
                {/* Coverage radius circles - animated pulses */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-full h-full rounded-full border-2 border-cyan-400/20 animate-pulse" />
                  <div
                    className="absolute w-[75%] h-[75%] rounded-full border-2 border-cyan-400/30 animate-pulse"
                    style={{ animationDelay: '0.5s' }}
                  />
                  <div
                    className="absolute w-[50%] h-[50%] rounded-full border-2 border-cyan-400/40 animate-pulse"
                    style={{ animationDelay: '1s' }}
                  />
                </div>

                {/* Central City Pin */}
                <div className="relative z-10">
                  <div className="absolute inset-0 bg-cyan-400 rounded-full blur-2xl opacity-60 animate-pulse" />
                  <div className="relative flex flex-col items-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-cyan-400 rounded-2xl blur-xl opacity-80" />
                      <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 border-4 border-slate-950 shadow-2xl">
                        <MapPin className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <div className="mt-3 px-4 py-2 bg-slate-50 border border-cyan-400/50 rounded-lg shadow-xl">
                      <div className="text-sm font-bold text-cyan-600">{city}</div>
                    </div>
                  </div>
                </div>

                {/* Surrounding Area Dots - positioned around the circle */}
                {nearbyAreas.slice(0, 8).map((area, index) => {
                  const angle = (index * 360) / Math.min(nearbyAreas.length, 8);
                  const radius = 42; // percentage from center
                  const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
                  const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

                  return (
                    <div
                      key={index}
                      className="absolute group"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-400 rounded-full blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
                        <div className="relative w-3 h-3 rounded-full bg-blue-400 border-2 border-slate-950 group-hover:scale-125 transition-transform" />
                      </div>
                      {/* Tooltip on hover */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-50 border border-blue-400/50 rounded-lg text-xs font-bold text-blue-600 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                        {area}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Coverage Indicator */}
              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-400/30 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-green-400" />
                  <span className="text-xs font-bold text-green-600">
                    Full Coverage: {serviceAreaRadius} Radius
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Areas List */}
          <div>
            <h3 className="text-2xl font-black text-slate-900 mb-6">
              We Proudly Serve These {state} Communities
            </h3>
            <p className="text-slate-700 text-sm sm:text-base mb-6 leading-relaxed">
              Our Voice AI solutions are available to businesses throughout the greater {city} area.
              Whether you're downtown or in the suburbs, we've got you covered.
            </p>

            {/* Areas Grid */}
            <div className="grid grid-cols-2 gap-3">
              {allAreas.map((area, index) => (
                <div
                  key={index}
                  className="group relative"
                >
                  <div className="absolute -inset-px bg-gradient-to-r from-cyan-400/0 via-cyan-400/30 to-cyan-400/0 rounded-lg opacity-0 group-hover:opacity-100 blur-sm transition-opacity" />
                  <div className="relative flex items-center gap-3 px-4 py-3 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-lg group-hover:border-cyan-400/50 transition-all">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-bold text-slate-700 group-hover:text-cyan-600 transition-colors">
                      {area}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-8 p-6 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 border border-cyan-400/30 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-400/20 border border-cyan-400/30 shrink-0">
                  <Headset className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900 mb-2">
                    Don't See Your Area?
                  </h4>
                  <p className="text-sm text-slate-700 mb-3">
                    We're expanding fast! Contact us to check if we can serve your location.
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-cyan-400 text-sm font-bold hover:text-cyan-600 transition-colors group/link"
                  >
                    <span>Contact Us</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
