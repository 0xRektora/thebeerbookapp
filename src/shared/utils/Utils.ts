export abstract class Utils {
    /**
     * Check if the device is a mobile device
     */
    static isMobileDevice(): boolean {
        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent,
            )
        )
            return true;
        else return false;
    }

    static formatAlcoholPercentage(percentage: number): string {
        const isDecimal = percentage % 1 !== 0;
        if (isDecimal) {
            return `${percentage.toString().padStart(3, '0')}%`;
        } else {
            return `${percentage}%`;
        }
    }
}
