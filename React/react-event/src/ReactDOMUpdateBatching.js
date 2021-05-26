export let isBatchingEventUpdates = false;
export function batchedEventUpdates(fn, a, b) {
    isBatchingEventUpdates = true;
    try {
        return fn(a, b);
    } finally {
        isBatchingEventUpdates = false;
    }
}