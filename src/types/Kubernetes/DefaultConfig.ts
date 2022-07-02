export default interface Config {
    apiVersion: string;
    kind: string; 
    metadata: StoreMetadata
    spec: StoreSpec
}
interface StoreMetadata {
    name: string;
}
interface StoreSpec {
    id: number;
}