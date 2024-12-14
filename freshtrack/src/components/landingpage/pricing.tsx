import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: 49,
    features: ['Real-time tracking', 'Temperature monitoring', 'Basic notifications', '24/7 support'],
  },
  {
    name: 'Pro',
    price: 99,
    features: ['All Starter features', 'Humidity control', 'Advanced analytics', 'API access'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: ['All Pro features', 'Custom integrations', 'Dedicated account manager', 'SLA guarantees'],
  },
]

export default function Pricing() {
  return (
    <div id="pricing" className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Choose the plan that best fits your needs. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {plans.map((plan) => (
            <div key={plan.name} className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                {typeof plan.price === 'number' ? (
                  <p className="mt-4 flex items-baseline text-gray-900">
                    <span className="text-5xl font-extrabold tracking-tight">${plan.price}</span>
                    <span className="ml-1 text-xl font-semibold">/month</span>
                  </p>
                ) : (
                  <p className="mt-4 text-5xl font-extrabold text-gray-900">{plan.price}</p>
                )}
                <ul className="mt-6 space-y-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex">
                      <Check className="flex-shrink-0 w-6 h-6 text-green-500" aria-hidden="true" />
                      <span className="ml-3 text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="#"
                className="bg-blue-600 text-white mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
              >
                {plan.name === 'Enterprise' ? 'Contact sales' : 'Start your trial'}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

