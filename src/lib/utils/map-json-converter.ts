export function map_to_json<T>(map: Map<string, T>){
    const obj: Record<string, unknown> = {};
    for(const [key, val] of map.entries()){
        obj[key] = val
    }
    return obj as T;
}

export function json_to_map<V>(json: Record<string, unknown>){
    const map = new Map<string, V>();
    for(const [key, val] of Object.entries(json)){
        map.set(key, val as V);
    }
    return map;
}