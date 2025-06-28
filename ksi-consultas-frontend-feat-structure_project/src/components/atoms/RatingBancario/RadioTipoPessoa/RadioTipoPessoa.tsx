// 'use client'

// import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
// import { useRating } from "@/contexts/RatingContext/RatingContext";

// export function RadioTipoPessoa() {
//   const { watch, setValue } = useRating();
//   const personType = watch("personType");

//   return (
//     <FormControl>
//       <FormLabel className="text-sm font-medium mb-3 block">Tipo de pessoa</FormLabel>
//       <RadioGroup
//         value={personType || ""}
//         onChange={(e) => setValue("personType", e.target.value as "fisica" | "juridica")}
//         aria-labelledby="tipo-pessoa-radio"
//       >
//         <FormControlLabel value="fisica" control={<Radio />} label="Física" />
//         <FormControlLabel value="juridica" control={<Radio />} label="Jurídica" />
//       </RadioGroup>
//     </FormControl>
//   );
// }