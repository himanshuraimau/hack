import { Thermometer, Droplets, MapPin, Bell } from 'lucide-react'

const features = [
  {
    name: 'Temperature Monitoring',
    description: 'Real-time temperature tracking to ensure product quality.',
    icon: Thermometer,
  },
  {
    name: 'Humidity Control',
    description: 'Monitor and control humidity levels throughout the supply chain.',
    icon: Droplets,
  },
  {
    name: 'Real-time Tracking',
    description: 'Track your shipments in real-time with precise location data.',
    icon: MapPin,
  },
  {
    name: 'Instant Notifications',
    description: 'Receive alerts and notifications for critical events.',
    icon: Bell,
  },
]

export default function Features() {
  return (
    <div id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Powerful Features for Supply Chain Management
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Freshtrack offers a comprehensive suite of tools to optimize your supply chain operations.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root bg-gradient-to-br from-blue-50 to-green-50 rounded-lg px-6 pb-8 h-full">
                  <div className="h-full flex flex-col">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.name}</h3>
                    <p className="mt-5 text-base text-gray-500 flex-grow">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

