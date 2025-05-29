import "../../../../../styles/globals.css";
import Cell from "./cell";

export default function AveryA4L710525Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="absolute block m-0 bg-white h-a4 w-a4 py-10mm px-13mm">
      <div className="absolute top-0 left-0 block pt-2 text-xs text-center text-gray-500 border-b border-r border-gray-300 w-13mm h-10mm">
        nw
      </div>
      <div className="absolute top-0 right-0 block pt-2 text-xs text-center text-gray-500 border-b border-l border-gray-300 w-13mm h-10mm">
        ne
      </div>
      <div className="absolute bottom-0 left-0 block pt-2 text-xs text-center text-gray-500 border-t border-r border-gray-300 w-13mm h-10mm">
        sw
      </div>
      <div className="absolute bottom-0 right-0 block pt-2 text-xs text-center text-gray-500 border-t border-l border-gray-300 w-13mm h-10mm">
        se
      </div>
      <table className="border border-collapse border-gray-300">
        <tbody>
          <tr>
            <Cell>{children}</Cell>
            <Cell>{children}</Cell>
            <Cell>{children}</Cell>
            <Cell>{children}</Cell>
          </tr>
          <tr>
            <Cell>{children}</Cell>
            <Cell>{children}</Cell>
            <Cell>{children}</Cell>
            <Cell>{children}</Cell>
          </tr>
          <tr>
            <Cell>{children}</Cell>
            <Cell>{children}</Cell>
            <Cell>{children}</Cell>
            <Cell>{children}</Cell>
          </tr>
          <tr>
            <Cell>{children}</Cell>
            <Cell>{children}</Cell>
            <Cell>{children}</Cell>
            <Cell>{children}</Cell>
          </tr>
          <tr>
            <Cell>{children}</Cell>
            <Cell>{children}</Cell>
            <Cell>{children}</Cell>
            <Cell>{children}</Cell>
          </tr>
          <tr>
            <Cell>{children}</Cell>
            <Cell>{children}</Cell>
            <Cell>{children}</Cell>
            <Cell>{children}</Cell>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
