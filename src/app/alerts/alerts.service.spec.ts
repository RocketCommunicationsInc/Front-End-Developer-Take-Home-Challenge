import { AlertsService } from "./alerts.service"
import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

describe('AlertsService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AlertsService]
        });
    })

    it('should request alert getData method', fakeAsync(inject([
        HttpTestingController,
        AlertsService,
    ], (
        httpMock: HttpTestingController,
        service: AlertsService,
    ) => {

    let result: any
    const path = '/assets/alerts.json'
    const data = { some: 'data' }
    const expected = { some: 'data' }

    service.getData(path).subscribe((data) => result = data)

    httpMock.expectOne(path).flush(data)
    tick()

    expect(result).toEqual(expected)
    httpMock.verify()
    })))
})