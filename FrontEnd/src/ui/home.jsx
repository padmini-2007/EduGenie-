// <!DOCTYPE html>
// <html lang="en">  
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>EduGenie - Attendance</title>
//     <script src="https://cdn.tailwindcss.com"></script>
//   </head>
//   <body class="bg-[#f5f7fa] text-[#1e293b] font-sans">
//     <div class="flex min-h-screen flex-col md:flex-row">
//       {/* <!-- Sidebar --> */}
//       <aside class="bg-white w-full md:w-64 shadow-md px-6 py-4 flex flex-col items-start">
//         <div class="flex items-center space-x-3 mb-6">
//           <img src="https://img.icons8.com/color/48/genie.png" alt="Genie" class="w-10 h-10" />
//           <h1 class="text-2xl font-bold text-[#2b2d42]">EduGenie</h1>
//         </div>
//         <nav class="space-y-4 w-full">
//           <a href="#" class="flex items-center space-x-2 text-[#475569] hover:text-blue-600">
//             <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
//               <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m-5 0h6" />
//             </svg>
//             <span>Dashboard</span>
//           </a>
//           <a href="#" class="flex items-center space-x-2 text-[#475569] hover:text-blue-600">
//             <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
//               <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A4 4 0 018 16h8a4 4 0 012.879 1.804M12 14a4 4 0 100-8 4 4 0 000 8z" />
//             </svg>
//             <span>Profile</span>
//           </a>
//           <a href="#" class="flex items-center space-x-2 font-bold text-blue-600">
//             <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
//               <path stroke-linecap="round" stroke-linejoin="round" d="M8 17l4 4 4-4m0-5l-4-4-4 4" />
//             </svg>
//             <span>Attendance</span>
//           </a>
//         </nav>
//       </aside>

//       <!-- Main Content -->
//       <main class="flex-1 p-4 md:p-8 bg-[#f5f7fa]">
//         <!-- Header -->
//         <div class="flex justify-between items-center mb-6">
//           <div>
//             <h2 class="text-xl font-bold">Attendance</h2>
//             <div class="flex space-x-2 mt-2">
//               <div class="px-3 py-1 bg-gray-100 rounded">13 Mon</div>
//               <div class="px-3 py-1 bg-gray-100 rounded">14 Tue</div>
//               <div class="px-3 py-1 bg-blue-700 text-white rounded">15 Wed</div>
//               <div class="px-3 py-1 bg-gray-100 rounded">16 Thu</div>
//               <div class="px-3 py-1 bg-gray-100 rounded">👆 Fri</div>
//               <div class="px-3 py-1 bg-gray-100 rounded">18 Sat</div>
//               <div class="px-3 py-1 bg-gray-100 rounded">19 Sun</div>
//             </div>
//           </div>

//           <!-- Profile -->
//           <div class="flex items-center space-x-2">
//             <img src="https://i.pravatar.cc/40" alt="Profile" class="rounded-full w-8 h-8" />
//             <div class="text-sm">
//               <p class="font-semibold">pavan.d</p>
//               <p class="text-gray-500 text-xs">Teacher</p>
//             </div>
//           </div>
//         </div>

//         <!-- Classes -->
//         <div class="grid md:grid-cols-2 gap-4">
//           <div class="bg-white rounded-lg shadow p-4">
//             <h3 class="font-semibold text-lg">Maths</h3>
//             <p class="text-sm text-gray-500">Class Time: 08:07 AM</p>
//             <button class="mt-2 px-3 py-1 bg-green-200 text-green-800 rounded">Mark Attendence</button>
//           </div>

//           <div class="bg-white rounded-lg shadow p-4">
//             <h3 class="font-semibold text-lg">Physics</h3>
//             <p class="text-sm text-gray-500">Class Time: 08:07 AM</p>
//             <button class="mt-2 px-3 py-1 bg-green-200 text-green-800 rounded">Mark Attendence</button>
//           </div>

//           <div class="bg-white rounded-lg shadow p-4">
//             <h3 class="font-semibold text-lg">DSA</h3>
//             <p class="text-sm text-gray-500">Class Time: 08:07 AM</p>
//             <button class="mt-2 px-3 py-1 bg-red-200 text-red-800 rounded">Mark Attendence</button>
//           </div>

//           <div class="bg-white rounded-lg shadow p-4">
//             <h3 class="font-semibold text-lg">ADA</h3>
//             <p class="text-sm text-gray-500">Class Time: 08:07 AM</p>
//             <button class="mt-2 px-3 py-1 bg-red-200 text-red-800 rounded">Mark Attendence</button>
//           </div>

//           <div class="bg-white rounded-lg shadow p-4">
//             <h3 class="font-semibold text-lg">PE</h3>
//             <p class="text-sm text-gray-500">Class Time: 08:07 AM</p>
//             <button class="mt-2 px-3 py-1 bg-red-200 text-red-800 rounded">Mark Attendence</button>
//           </div>
//         </div>

//         <!-- Right Panel -->
//         <div class="mt-8 grid md:grid-cols-2 gap-6">
//           <!-- Student List -->
//           <div class="bg-white rounded-lg shadow p-4">
//             <h3 class="font-bold text-lg mb-4">Students</h3>
//             <div class="space-y-2">
//               <div class="flex justify-between items-center"><span>Pavan.D</span><button class="text-yellow-800 bg-yellow-200 px-2 py-1 rounded">Check</button></div>
//               <div class="flex justify-between items-center"><span>bomber</span><button class="text-green-800 bg-green-200 px-2 py-1 rounded">Check</button></div>
//               <div class="flex justify-between items-center"><span>kabhi kabhi</span><button class="text-red-800 bg-red-200 px-2 py-1 rounded">Check</button></div>
//               <div class="flex justify-between items-center"><span>Double Gamer</span><button class="text-red-800 bg-red-200 px-2 py-1 rounded">Check</button></div>
//               <div class="flex justify-between items-center"><span>Pussy</span><button class="text-red-800 bg-red-200 px-2 py-1 rounded">Check</button></div>
//             </div>
//           </div>

//           <!-- Chatbot -->
//           <div class="bg-white rounded-lg shadow p-4">
//             <h3 class="font-bold text-lg mb-2 text-blue-900">Edu Genie Chat Bot</h3>
//             <div class="border border-red-200 rounded p-4 text-center text-lg font-semibold text-gray-800">
//               Hi!<br />
//               Pavan.D
//             </div>
//             <button class="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-black py-2 px-4 rounded">
//               click here to start a chat
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   </body>
// </html>