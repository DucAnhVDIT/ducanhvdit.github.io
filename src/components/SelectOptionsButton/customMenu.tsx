import React, { useRef, useEffect } from "react";
import Select, { components, MenuProps, MenuListProps } from "react-select";
import { Users } from "lucide-react";

export const CustomMenu = (props: MenuListProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const menuEl = menuRef.current;
    if (menuEl) {
      const rect = menuEl.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      if (rect.left < 0) {
        menuEl.style.left = 'auto';
        menuEl.style.right = '0';
      } else if (rect.right > viewportWidth) {
        menuEl.style.right = 'auto';
        menuEl.style.left = '0';
      }
    }
  }, [props.children]);

  return (
    <div ref={menuRef} style={{ position: 'relative' }}>
      <components.MenuList {...props}>{props.children}</components.MenuList>
    </div>
  );
};