# Concept / Ідея проєкту

**Nomination II.** Full title: CodeSensei — Interactive AI Mentor for a Metaverse Laboratory.

## English

CodeSensei is an AI assistant shaped as an NPC for the department’s virtual laboratory (MetaLab) on VRChat in the Erasmus+ NEXT-Study metaverse. The problem it solves is the lack of instant mentor feedback while students practice remotely. At a virtual terminal they get OOP explanations, help writing code, and a review of a snippet without leaving VR.

The client is C# / UdonSharp (VRChat SDK3): UI terminal, input, asynchronous GET requests. The backend is .NET with Clean Architecture: a protected proxy that builds system prompts, calls Google Gemini (the LLM analog of the planned OpenAI API) and returns VR-sized lines — API keys never enter the game client. Because Udon cannot POST, a live review uses a five-character ticket, the public /paste page, and a GET inbox the prefab already polls. NUnit covers the domain. The deliverable is `client/CodeSensei.unitypackage`, ready to drop into MetaLab or another NEXT world.

## Українською

CodeSensei — ШІ-асистент у вигляді NPC для віртуальної навчальної лабораторії кафедри (MetaLab) на VRChat у метавсесвіті Erasmus+ NEXT-Study. Проблема: немає миттєвого зворотного зв’язку ментора під час самостійної практики на дистанції. Біля віртуального термінала студент отримує пояснення ООП, допомогу в коді та рев’ю фрагмента, не виходячи з VR.

Клієнт — C# / UdonSharp (VRChat SDK3): UI-термінал, введення, асинхронні GET-запити. Бекенд — .NET за Clean Architecture: захищений проксі формує системні промпти, звертається до Google Gemini (аналог запланованого OpenAI API) і повертає рядки під VR-екран; ключі не потрапляють у клієнт гри. Udon не вміє POST, тому живе рев’ю йде через квиток з 5 символів, сторінку /paste і GET-inbox, який уже опитує префаб. Домен покрито NUnit. Результат — `client/CodeSensei.unitypackage` для MetaLab або іншого світу NEXT.
