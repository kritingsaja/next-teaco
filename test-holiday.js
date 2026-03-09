// Test holiday dates functionality
const HOLIDAYS = [
  new Date(2026, 2, 19), // March 19, 2026
  new Date(2026, 2, 20), // March 20, 2026
  new Date(2026, 2, 21), // March 21, 2026
  new Date(2026, 2, 22), // March 22, 2026
];

function isHoliday(date) {
  return HOLIDAYS.some(holiday => 
    holiday.getDate() === date.getDate() &&
    holiday.getMonth() === date.getMonth() &&
    holiday.getFullYear() === date.getFullYear()
  );
}

console.log('🧪 Testing Holiday Dates (19-22 March 2026):\n');

// Test dates
const testDates = [
  new Date(2026, 2, 18), // March 18 - Not holiday
  new Date(2026, 2, 19), // March 19 - Holiday
  new Date(2026, 2, 20), // March 20 - Holiday
  new Date(2026, 2, 21), // March 21 - Holiday
  new Date(2026, 2, 22), // March 22 - Holiday
  new Date(2026, 2, 23), // March 23 - Not holiday
  new Date(2026, 2, 24), // March 24 - Not holiday
  new Date(2026, 1, 19), // Feb 19 - Not holiday (wrong month)
  new Date(2025, 2, 19), // March 19, 2025 - Not holiday (wrong year)
];

testDates.forEach((date, i) => {
  const isHolidayDate = isHoliday(date);
  const dateStr = date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  console.log(`${i+1}. ${dateStr}`);
  console.log(`   Status: ${isHolidayDate ? '🚫 LIBUR' : '✅ BUKA'}`);
  console.log(`   Booking: ${isHolidayDate ? '❌ TIDAK BISA' : '✅ BISA'}`);
  console.log('');
});

console.log('📋 Summary:');
console.log(`- Total holiday dates: ${HOLIDAYS.length}`);
console.log(`- Dates: 19, 20, 21, 22 Maret 2026`);
console.log(`- Website akan tampil: "LIBUR" di calendar`);
console.log(`- Booking akan di-block untuk tanggal tersebut`);
console.log(`- Auto disable setelah: 23 Maret 2026`);