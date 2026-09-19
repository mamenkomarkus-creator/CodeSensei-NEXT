# Ідея проєкту / Project concept

**CodeSensei: Інтерактивний AI-ментор для Metaverse-лабораторії**  
Номінація II · інтерактивний ШІ-застосунок · Erasmus+ NEXT-Study Metaverse

Тімлід: Ільєнко Денис. Університет: КПІ ім. Ігоря Сікорського.

## Проблема

Під час дистанційної практики в VR-лабораторії студент лишається без миттєвого зворотного зв’язку. Викладач не може стояти біля кожного термінала. Саме цю прогалину закриває CodeSensei.

## Ідея

ШІ-асистент у вигляді NPC біля віртуального термінала в лабораторії кафедри (MetaLab) на VRChat. Студент отримує:

- пояснення концепцій об’єктно-орієнтованого програмування (24 пресети);
- допомогу в написанні коду;
- живе рев’ю фрагмента безпосередньо в VR.

Ефект — присутність викладача-консультанта в тій самій залі, що й група.

## Мета

1. Клієнтський інтерфейс мовою C# (UdonSharp) усередині VRChat.
2. Надійний .NET-бекенд: захищений проксі до LLM, ключі не потрапляють у гру.
3. Інтеграція асистента в MetaLab для якіснішого дистанційного навчання.
4. Архітектура Clean Architecture + DDD, щоб змінювати LLM-провайдера без переписування світу.
5. Готовий Unity-пакет, який імпортує будь-яка команда NEXT.

## Результат

Функціональний ШІ-застосунок номінації II: префаб `client/CodeSensei.unitypackage`, живий API на Render, документація та дві презентації на офіційному шаблоні NEXT.

## English

CodeSensei is an NPC-style AI mentor in the department MetaLab on VRChat (Erasmus+ NEXT). It answers the lack of instant feedback during remote OOP practice: 24 topic presets, live snippet review, and a shared VR screen. The UdonSharp client talks GET-only to a Clean Architecture .NET proxy; Google Gemini stays behind the server. Team lead: Denys Ilienko. Deliverable: a drop-in Unity package for MetaLab and other NEXT worlds.
