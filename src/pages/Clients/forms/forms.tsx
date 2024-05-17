import Box from "@mui/material/Box/Box";
import React from "react";
import { FileText } from 'lucide-react';


// ...

function Forms() {
  return (
    <div className="flex flex-col items-center justify-center w-full md:border md:rounded-md md:border-slate-500/60 p-10">
        <FileText size={48} className="text-gray-400 mb-4" />
        <div>No forms</div>
    </div>
  );
}

export default Forms;
