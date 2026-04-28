/* eslint-disable @typescript-eslint/no-explicit-any */
const _this = globalThis as any;
declare const ktTimer: {
    schedule(id: number, delay: number, repeat: boolean): void;
    cancel(id: number): void;
}

declare const ktConsole: Record<'log' | 'info' | 'warn' | 'error' | 'debug', (message: string) => void>;

// Console
_this.console = {
    log: (...a: any[]) => ktConsole.log(a.map(x => String(x)).join(' ')),
    info: (...a: any[]) => ktConsole.info(a.map(x => String(x)).join(' ')),
    warn: (...a: any[]) => ktConsole.warn(a.map(x => String(x)).join(' ')),
    error: (...a: any[]) => ktConsole.error(a.map(x => String(x)).join(' ')),
    debug: (...a: any[]) => ktConsole.debug(a.map(x => String(x)).join(' ')),
};

// Timers
(function () {
    if (_this.__vt_timers_installed) return;
    _this.__vt_timers_installed = true;
    _this.__vt_timer_callbacks = Object.create(null);
    _this.__vt_nextTimerId = 1;

    _this.setTimeout = function (fn: (...args: unknown[]) => void, t: number) {
        const id = _this.__vt_nextTimerId++;
        _this.__vt_timer_callbacks[id] = function (...a: unknown[]) { try { fn(...a); } catch (e) { console.error('__vt timer callback error', e); } };
        try { ktTimer.schedule(id, t || 0, false); } catch (e) { console.error('ktTimer.schedule failed', e); }
        return id;
    };

    _this.setInterval = function (fn: (...args: unknown[]) => void, t: number) {
        const id = _this.__vt_nextTimerId++;
        _this.__vt_timer_callbacks[id] = function (...a: unknown[]) { try { fn(...a); } catch (e) { console.error('__vt interval callback error', e); } };
        try { ktTimer.schedule(id, t || 0, true); } catch (e) { console.error('ktTimer.schedule failed', e); }
        return id;
    };

    _this.clearTimeout = _this.clearInterval = function (id: number) {
        try { ktTimer.cancel(id); } catch (e) { /* ignore */ }
        try { delete _this.__vt_timer_callbacks[id]; } catch (e) {
            console.error('delete timer callback failed', e);
        }
    };

    _this.__vt_clearTimers = function () {
        try {
            const ids = Object.keys(_this.__vt_timer_callbacks || {});
            for (const id of ids) {
                try { ktTimer.cancel(Number(id)); } catch (e) { console.error('ktTimer.cancel failed', e); }
                try { delete _this.__vt_timer_callbacks[id]; } catch (e) { console.error('delete timer callback failed', e); }
            }
        } catch (e) { console.error('__vt_clearTimers error', e); }
    };

    _this.__vt_invokeTimer = function (id: any) {
        try {
            const cb = _this.__vt_timer_callbacks[id];
            if (cb) cb();
        } catch (e) { console.error('__vt invoke error', e); }
    };

})();