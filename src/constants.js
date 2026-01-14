export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  c: "10.2.0",
  cpp: "10.2.0",
  php: "8.2.3",
  perl: "5.36.0",
  ruby: "3.0.1",
};

export const CODE_SNIPPETS = {
  javascript: `function greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Your name");\n`,
  typescript: `type Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Your name" });\n`,
  python: `def greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Your name")\n`,
  java: `public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  csharp:
    'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
  php: "<?php\n\n$name = 'Your name';\necho $name;\n",
  c: `#include <stdio.h>\n\nint main() {\n\tprintf("Hello, World!");\n\treturn 0;\n}\n`,
  cpp: `#include <iostream>\n\nint main() {\n\tstd::cout << "Hello World!";\n\treturn 0;\n}\n`,
  perl: `my $name = "Your name";\nprint "Hello, $name!\\n";\n`,
  ruby: `name = "Your name"\nputs "Hello, #{name}!"\n`,
};