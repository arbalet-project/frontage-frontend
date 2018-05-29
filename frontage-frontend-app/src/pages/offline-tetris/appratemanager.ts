import {AppRate} from "@ionic-native/app-rate";
import {AppStorage} from "./appstorage";

export class AppRateManager {

    // static readonly storeAppURL:Object = {
    //     ios: 'de.renegust.tetrisblocksadfree',
    //     android: 'market://details?id=de.renegust.tetrisblocksadfree'
    // };

    static pageOpenedCount = 0;

    public static async showRateContainer() {
        // try {
        //     let appRate = new AppRate();
        //     appRate.preferences.storeAppURL = AppRateManager.storeAppURL;

        //     appRate.promptForRating(true);
        // }
        // catch (e) {
        // }
    }

    public static gameOver() {
        // AppRateManager.pageOpenedCount++;
        let rateContainerShown = false;
        // AppStorage.getItem('rateContainerShown').then((data) => {
        //     rateContainerShown = data
        //     if (AppRateManager.pageOpenedCount % 7 == 0 && !rateContainerShown) {
        //         AppStorage.setItem('rateContainerShown', true);
        //         AppRateManager.showRateContainer();
        //     }
        // });
    }
}
