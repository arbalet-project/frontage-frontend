import {NativeStorage} from "@ionic-native/native-storage";

export class AppStorage {

    private static nativeStorage = new NativeStorage();

    /**
     * sets an item
     * @param reference
     * @param value
     * @returns {Promise<any>}
     */
    public static setItem(reference: string, value: any): Promise<any> {
        return AppStorage.nativeStorage.setItem(reference, value);
    }

    /**
     * gets an item
     * @param reference
     * @returns {Promise<any>}
     */
    public static getItem(reference: string): Promise<any> {
        return AppStorage.nativeStorage.getItem(reference);
    }

    /**
     * Removes a single stored item
     * @param reference
     * @returns {Promise<any>}
     */
    public static remove(reference: string): Promise<any> {
        return AppStorage.nativeStorage.remove(reference);
    }

    /**
     * Retrieving all keys
     * @returns {Promise<any>}
     */
    public static keys(): Promise<any> {
        return AppStorage.nativeStorage.keys();
    };

    /**
     * Removes all stored values.
     * @returns {Promise<any>}
     */
    public static clear(): Promise<any> {
        return AppStorage.nativeStorage.clear();
    };
}
