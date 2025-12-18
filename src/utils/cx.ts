/**
 * Concatena classes condicionais em uma única string.
 *
 * Aceita qualquer quantidade de valores (strings, `false` ou `undefined`)
 * e retorna somente as entradas válidas (truthy), separadas por espaço.
 *
 * @param {...(string | false | undefined)} classes - Lista de classes que podem ser strings ou valores falsy.
 * @returns {string} Uma string contendo apenas as classes válidas, separadas por espaço.
 *
 * @example
 * cx("btn", isActive && "btn-active", isDisabled && false)
 * // "btn btn-active"
 *
 * @example
 * cx(undefined, "a", false, "b")
 * // "a b"
*/
export function cx(...classes: (string | false | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}