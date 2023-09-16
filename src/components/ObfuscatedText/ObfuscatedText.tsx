import { useState, useEffect } from "react";

interface Props {
   obfuscationSpeed?: number;
   children: string;
}

export default function ObfuscatedText({ children, obfuscationSpeed = 1000 }: Props) {
   const obfuscationCharacters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@#$%^&*()-+=[]{}|;:,./<>?";

   const [obfuscatedText, setObfuscatedText] = useState<string>("");
   const [reveal, setReveal] = useState<boolean>(false);

   useEffect(() => {
      const obfuscate = () => {
         const obfuscatedChars = children
            .split("")
            .map(() => {
               const randomCharIndex = Math.floor(
                  Math.random() * obfuscationCharacters.length
               );
               return obfuscationCharacters[randomCharIndex];
            })
            .join("");

         setObfuscatedText(obfuscatedChars);
      };

      const obfuscationInterval = setInterval(obfuscate, 100); // Change characters every 100ms

      const revealTimeout = setTimeout(() => {
         clearInterval(obfuscationInterval);
         setObfuscatedText(children);
         setReveal(true);
      }, obfuscationSpeed);

      return () => {
         clearInterval(obfuscationInterval);
         clearTimeout(revealTimeout);
      };
   }, [children, obfuscationSpeed]);

   return <div>{obfuscatedText}</div>;
}
