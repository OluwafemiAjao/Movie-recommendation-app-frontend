// export default function NotFound() {
//   return (
//     <div className="p-4 text-red-600 text-center">
//       <h1 className="text-2xl font-bold">404 - StarFlix Page Not Found</h1>
//       <p className="mt-2">Oops! The page you're looking for doesn't exist.</p>
//     </div>
//   );
// }





// import { Link } from "react-router-dom";

// const NotFound = () => {
//   return (
//     <div className="h-screen flex flex-col items-center justify-center text-center">
//       <h1 className="text-5xl font-bold text-red-500">404 - StarFlix Page Not Found</h1>
//       <p className="mt-4 text-lg">Oops! The page you're looking for doesn't exist.</p>
//       <Link
//         to="/"
//         className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
//       >
//         Go Home
//       </Link>
//     </div>
//   );
// };

// export default NotFound;





import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-bold text-red-500">
        404 - StarFlix Page Not Found
      </h1>
      <p className="mt-4 text-lg">
        Oops! The page you're looking for doesn't exist.
      </p>
      <div className="flex gap-4 mt-6">
        <Link
          to="/"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Go Home
        </Link>
        <Link
          to="/search"
          className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          Search Movies/TV
        </Link>
        <Link
          to="/profile"
          className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700"
        >
          Your Profile
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
