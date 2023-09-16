import { useState, useEffect } from "react";
import styles from "./obfuscatedText.module.scss";

interface Props {
   obfuscationSpeed?: number;
   children: string;
   className?: string;
}

export default function ObfuscatedText({
   children,
   obfuscationSpeed = 1000,
   className,
}: Props) {
   const obfuscationCharacters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@#$%^&*()-+=[]{}|;:,./<>?";

   const [obfuscatedText, setObfuscatedText] = useState<string>("");
   const [reveal, setReveal] = useState<boolean>(false);

   useEffect(() => {
      const revealTimeout = setTimeout(() => {
         setObfuscatedText(children);
         setReveal(true);
      }, obfuscationSpeed);

      return () => {
         clearTimeout(revealTimeout);
      };
   }, [children, obfuscationSpeed]);

   useEffect(() => {
      if (!reveal) {
         //  const characterCount = children.replace(/ /g, "").length;
         let obfuscationInterval: NodeJS.Timeout;

         const Obfuscate = () => {
            const obfuscatedChars = children
               .split("")
               .map((char) => {
                  const randomCharIndex = Math.floor(
                     Math.random() * obfuscationCharacters.length
                  );
                  return char !== " " ? obfuscationCharacters[randomCharIndex] : " ";
               })
               .join("");

            setObfuscatedText(obfuscatedChars);
         };

         const StartObfuscating = () => {
            Obfuscate();

            const randomInterval = Math.floor(Math.random() * (100 - 20 + 1)) + 20;
            obfuscationInterval = setTimeout(StartObfuscating, randomInterval);
         };

         StartObfuscating();

         return () => {
            clearTimeout(obfuscationInterval);
         };
      }
   }, [children, reveal]);

   return (
      <p className={`${className}, ${styles.test}`}>
         {reveal ? children : obfuscatedText}
      </p>
   );
}
