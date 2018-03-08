class MockAppConfig {
    private config = {
        'apiFacadeEndpoint': 'http://localhost:3000'
    };

    public getConfig(key: any) {
        return this.config[key];
    }
}

// describe('DeviceStatusService', function () {
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [
//                 HttpModule
//             ],
//             providers: [
//                 DeviceStatusService,
//                 { provide: AppConfig, useClass: MockAppConfig },
//                 { provide: XHRBackend, useClass: MockBackend }
//             ]
//         });
//     }));

//     it('should return latest record for device',
//         inject([DeviceStatusService, XHRBackend], (deviceStatusService, mockBackend) => {
//             const mockResponse = {
//                 'deviceId': '2223',
//                 'flags': [
//                 {
//                     'name': 'printer',
//                     'value': '0'
//                 },
//                 {
//                     'name': 'coins',
//                     'value': 'low'
//                 }]
//             };

//             mockBackend.connections.subscribe((connection) => {
//                 connection.mockRespond(new Response(new ResponseOptions({
//                     body: JSON.stringify(mockResponse)
//                 })));
//             });

//             deviceStatusService.getDeviceState('2223').subscribe((data) => {
//                 expect(data.deviceId).toEqual('2223');
//                 expect(data.flags.length).toBe(2);
//             });
//         }));
// });
