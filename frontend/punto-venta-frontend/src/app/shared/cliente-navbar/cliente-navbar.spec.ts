import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteNavbar } from './cliente-navbar';

describe('ClienteNavbar', () => {
  let component: ClienteNavbar;
  let fixture: ComponentFixture<ClienteNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteNavbar],
    }).compileComponents();

    fixture = TestBed.createComponent(ClienteNavbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
