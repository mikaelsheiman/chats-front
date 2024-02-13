export const format_check_spam_results = (value) => {
    if (value == null) {
        return "Определяется"
    }

    if (value == -1) {
        return "Не удалось обработать"
    }

    if (value == 0) {
        return "Не содержит"
    }

    return "Содержит"
}