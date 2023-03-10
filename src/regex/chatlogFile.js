const CHAT_LOG_FILE_PATTERN = '^(.+)_Chatlog_(\\d{4}-\\d{2}-\\d{2})\\.log$';

const getChatLogFileRegex = () => new RegExp(CHAT_LOG_FILE_PATTERN, 'i');

export default getChatLogFileRegex;
