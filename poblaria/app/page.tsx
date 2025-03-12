import Link from 'next/link';

const Project = () => {
  return (
    <div>
        <h1 className="text-4xl font-bold bg-green-500">Welcome to POBLARIA!</h1>
        <p className="text-lg mt-4 text-gray-600">
          Discover Your Perfect Rural Escape
        </p>

      <div className="flex space-x-6">
        <Link href="/explore" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
          Explore
        </Link>
      </div>
    </div>
  );
};

export default Project;