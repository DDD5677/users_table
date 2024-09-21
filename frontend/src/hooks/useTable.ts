import { useState } from "react";

function UseTable(users: any) {
   const [selected, setSelected] = useState<readonly number[]>([]);

   const handleSelectAllClick = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      if (event.target.checked) {
         const newSelected = users.map((n: any) => n.id);
         setSelected(newSelected);
         return;
      }
      setSelected([]);
   };

   const handleClick = (id: number) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected: readonly number[] = [];

      if (selectedIndex === -1) {
         newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
         newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
         newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
         newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1)
         );
      }
      setSelected(newSelected);
   };
   return {
      selected,
      setSelected,
      handleClick,
      handleSelectAllClick,
   };
}

export default UseTable;
