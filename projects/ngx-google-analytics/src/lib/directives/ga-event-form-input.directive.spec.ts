import { GaEventFormInputDirective } from './ga-event-form-input.directive';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NgxGoogleAnalyticsModule } from '../ngx-google-analytics.module';
import { GaEventDirective } from './ga-event.directive';
import { GaEventCategoryDirective } from './ga-event-category.directive';
import { GoogleAnalyticsService } from '../services/google-analytics.service';
import { Component } from '@angular/core';
import { NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN } from '../tokens/ngx-google-analytics-settings-token';

describe('GaEventFormInputDirective', () => {

  @Component({
    selector: 'ga-host',
    template: `<input gaEvent="teste">`
  })
  class HostComponent {}

  let gaEventFormInput: GaEventFormInputDirective,
      gaEvent: GaEventDirective,
      gaCategory: GaEventCategoryDirective,
      host: HostComponent,
      fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxGoogleAnalyticsModule
      ],
      declarations: [
        HostComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    gaCategory = new GaEventCategoryDirective();
    gaEvent = new GaEventDirective(gaCategory, TestBed.get(GoogleAnalyticsService), TestBed.get(NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN));
    gaEventFormInput = new GaEventFormInputDirective(gaEvent);
  });

  it('should create an instance', () => {
    expect(gaEventFormInput).toBeTruthy();
  });

  it('should update gaBind when input is updated', () => {
    gaEventFormInput.gaBind = 'click';
    expect(gaEvent.gaBind).toBe('click');
  });

  it('should use `focus` as a default gaBind', () => {
    expect(gaEvent.gaBind).toBe('focus');
  });

  it('should call `GoogleAnalyticsService.event()` on trigger focus at input', () => {
    const ga: GoogleAnalyticsService = TestBed.get(GoogleAnalyticsService),
          spyOnGa = spyOn(ga, 'event'),
          input = fixture.debugElement.query(e => e.name === 'input');

    fixture.detectChanges();
    input.triggerEventHandler('focus', null);
    fixture.detectChanges();

    expect(spyOnGa).toHaveBeenCalledWith('teste', undefined, undefined, undefined, undefined);
  });
});
