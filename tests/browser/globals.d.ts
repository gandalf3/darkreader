import type {RequestListener} from 'http';
import type {WaitForOptions} from 'puppeteer-core';
import type {ExtensionData, UserSettings} from '../../src/definitions';

type PathsObject = {[path: string]: string | RequestListener | PathsObject};
type OneStyleExpectation = [selector: string | string[], cssAttributeName: string, expectedValue: string];
type StyleExpectations = OneStyleExpectation[] | OneStyleExpectation;

declare global {
    const loadTestPage: (paths: PathsObject & {cors?: PathsObject}, gotoOptions?: WaitForOptions) => Promise<void>;
    const corsURL: string;
    const popupUtils: {
        click: (selector: string) => Promise<void>;
        exists: (selector: string) => Promise<boolean>;
    };
    const devtoolsUtils: {
        paste: (fixes: string) => Promise<void>;
        reset: () => Promise<void>;
    };
    const backgroundUtils: {
        changeSettings: (settings: Partial<UserSettings>) => Promise<void>;
        collectData: () => Promise<ExtensionData>;
        changeChromeStorage: (region: 'local' | 'sync', data: {[key: string]: any}) => Promise<void>;
        getChromeStorage: (region: 'local' | 'sync', keys: string[]) => Promise<{[key: string]: any}>;
        getManifest: () => Promise<chrome.runtime.Manifest>;
        createTab: (url: string) => Promise<void>;
    };
    const emulateMedia: (name: string, value: string) => Promise<void>;
    const awaitForEvent: (uuid: string) => Promise<void>;
    const expectPageStyles: (expect: jest.Expect, expectations: StyleExpectations) => Promise<void>;
    const getColorScheme: () => Promise<'dark' | 'light'>;
    const evaluateScript: (script: () => any) => Promise<any>;
    const product: 'firefox';
}
