
import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'LocationFilter',
    pure: false
})

/**
 * Angular2 Pipe to filter the location data based on the organisation.
 */
@Injectable()
export class LocationFilter implements PipeTransform {
    transform(items: any[], filter?): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.organisationId.indexOf(filter) !== -1);
    }
}
