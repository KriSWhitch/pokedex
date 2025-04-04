export const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string 
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="text-yellow-400 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-center mb-3">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);