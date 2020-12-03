import { ContactsService } from "./contacts.service"
import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

describe('ContactsService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ContactsService]
        });
    })

    it('should request contact getData method', fakeAsync(inject([
        HttpTestingController,
        ContactsService,
    ], (
        httpMock: HttpTestingController,
        service: ContactsService,
    ) => {

    let result: any
    const path = '/assets/contacts.json'
    const data = { some: 'data' }
    const expected = { some: 'data' }

    service.getData(path).subscribe((data) => result = data)

    httpMock.expectOne(path).flush(data)
    tick()

    expect(result).toEqual(expected)
    httpMock.verify()
    })))
})