export default function Cell({ children }: { children: React.ReactNode }) {
  return (
    <td className="relative text-center border border-gray-200 h-45mm w-46mm place-content-center place-items-center">
      {children}
      <div className="absolute border border-gray-200 rounded-full top-3mm left-3mm h-40mm w-40mm print:border-0"></div>
    </td>
  );
}
