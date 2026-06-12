// components/DiplomaSkeleton.tsx

export default function DiplomaSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-2.5 mt-10">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i}>
          <div className="w-full h-112 relative overflow-hidden rounded-lg bg-gray-200 animate-pulse">

            <div className="w-full h-full bg-gray-300" />

            <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-gray-400/70 p-4 rounded-md">
              
            
              <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />

             
              <div className="h-4 w-full bg-gray-200 rounded mb-1" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}