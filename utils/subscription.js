"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicSubscription = void 0;
var voice_1 = require("@discordjs/voice");
var node_util_1 = require("node:util");
var wait = (0, node_util_1.promisify)(setTimeout);
/**
 * A MusicSubscription exists for each active VoiceConnection. Each subscription has its own audio player and queue,
 * and it also attaches logic to the audio player and voice connection for error handling and reconnection logic.
 */
var MusicSubscription = /** @class */ (function () {
    function MusicSubscription(voiceConnection) {
        var _this = this;
        this.queueLock = false;
        this.readyLock = false;
        this.voiceConnection = voiceConnection;
        this.audioPlayer = (0, voice_1.createAudioPlayer)();
        this.queue = [];
        this.voiceConnection.on('stateChange', function (_, newState) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(newState.status === voice_1.VoiceConnectionStatus.Disconnected)) return [3 /*break*/, 9];
                        if (!(newState.reason === voice_1.VoiceConnectionDisconnectReason.WebSocketClose && newState.closeCode === 4014)) return [3 /*break*/, 5];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (0, voice_1.entersState)(this.voiceConnection, voice_1.VoiceConnectionStatus.Connecting, 5000)];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _c.sent();
                        this.voiceConnection.destroy();
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 8];
                    case 5:
                        if (!(this.voiceConnection.rejoinAttempts < 5)) return [3 /*break*/, 7];
                        /**
                         * The disconnect in this case is recoverable, and we also have <5 repeated attempts so we will reconnect.
                         */
                        return [4 /*yield*/, wait((this.voiceConnection.rejoinAttempts + 1) * 5000)];
                    case 6:
                        /**
                         * The disconnect in this case is recoverable, and we also have <5 repeated attempts so we will reconnect.
                         */
                        _c.sent();
                        this.voiceConnection.rejoin();
                        return [3 /*break*/, 8];
                    case 7:
                        /**
                         * The disconnect in this case may be recoverable, but we have no more remaining attempts - destroy.
                         */
                        this.voiceConnection.destroy();
                        _c.label = 8;
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        if (!(newState.status === voice_1.VoiceConnectionStatus.Destroyed)) return [3 /*break*/, 10];
                        /**
                         * Once destroyed, stop the subscription.
                         */
                        this.stop();
                        return [3 /*break*/, 15];
                    case 10:
                        if (!(!this.readyLock &&
                            (newState.status === voice_1.VoiceConnectionStatus.Connecting || newState.status === voice_1.VoiceConnectionStatus.Signalling))) return [3 /*break*/, 15];
                        /**
                         * In the Signalling or Connecting states, we set a 20 second time limit for the connection to become ready
                         * before destroying the voice connection. This stops the voice connection permanently existing in one of these
                         * states.
                         */
                        this.readyLock = true;
                        _c.label = 11;
                    case 11:
                        _c.trys.push([11, 13, 14, 15]);
                        return [4 /*yield*/, (0, voice_1.entersState)(this.voiceConnection, voice_1.VoiceConnectionStatus.Ready, 20000)];
                    case 12:
                        _c.sent();
                        return [3 /*break*/, 15];
                    case 13:
                        _b = _c.sent();
                        if (this.voiceConnection.state.status !== voice_1.VoiceConnectionStatus.Destroyed)
                            this.voiceConnection.destroy();
                        return [3 /*break*/, 15];
                    case 14:
                        this.readyLock = false;
                        return [7 /*endfinally*/];
                    case 15: return [2 /*return*/];
                }
            });
        }); });
        // Configure audio player
        this.audioPlayer.on('stateChange', function (oldState, newState) {
            if (newState.status === voice_1.AudioPlayerStatus.Idle && oldState.status !== voice_1.AudioPlayerStatus.Idle) {
                // If the Idle state is entered from a non-Idle state, it means that an audio resource has finished playing.
                // The queue is then processed to start playing the next track, if one is available.
                oldState.resource.metadata.onFinish();
                void _this.processQueue();
            }
            else if (newState.status === voice_1.AudioPlayerStatus.Playing) {
                // If the Playing state has been entered, then a new track has started playback.
                newState.resource.metadata.onStart();
            }
        });
        this.audioPlayer.on('error', function (error) {
            return error.resource.metadata.onError(error);
        });
        voiceConnection.subscribe(this.audioPlayer);
    }
    /**
     * Adds a new Track to the queue.
     *
     * @param track The track to add to the queue
     */
    MusicSubscription.prototype.enqueue = function (track) {
        this.queue.push(track);
        void this.processQueue();
    };
    /**
     * Stops audio playback and empties the queue.
     */
    MusicSubscription.prototype.stop = function () {
        this.queueLock = true;
        this.queue = [];
        this.audioPlayer.stop(true);
    };
    /**
     * Attempts to play a Track from the queue.
     */
    MusicSubscription.prototype.processQueue = function () {
        return __awaiter(this, void 0, Promise, function () {
            var nextTrack, resource, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // If the queue is locked (already being processed), is empty, or the audio player is already playing something, return
                        if (this.queueLock || this.audioPlayer.state.status !== voice_1.AudioPlayerStatus.Idle || this.queue.length === 0) {
                            return [2 /*return*/];
                        }
                        // Lock the queue to guarantee safe access
                        this.queueLock = true;
                        nextTrack = this.queue.shift();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, nextTrack.createAudioResource()];
                    case 2:
                        resource = _a.sent();
                        this.audioPlayer.play(resource);
                        this.queueLock = false;
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        // If an error occurred, try the next item of the queue instead
                        nextTrack.onError(error_1);
                        this.queueLock = false;
                        return [2 /*return*/, this.processQueue()];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return MusicSubscription;
}());
exports.MusicSubscription = MusicSubscription;
