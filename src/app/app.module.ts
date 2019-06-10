import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { NavBrowserComponent } from './components/nav-browser/nav-browser.component';
import { NavMobileComponent } from './components/nav-mobile/nav-mobile.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { SplashComponent } from './pages/splash/splash.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { DeckComponent } from './pages/deck/deck.component';
import { FlashcardComponent } from './pages/flashcard/flashcard.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { AddCardComponent } from './pages/add-card/add-card.component';
import { ForumsComponent } from './pages/forums/forums.component';
import { CameraViewComponent } from './pages/camera-view/camera-view.component';
import { ContinuePageComponent } from './pages/continue-page/continue-page.component';
import { FinalConfirmComponent } from './pages/final-confirm/final-confirm.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { EditCardComponent } from './pages/edit-card/edit-card.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBrowserComponent,
    NavMobileComponent,
    HeaderComponent,
    HomeComponent,
    SplashComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ContactsComponent,
    DeckComponent,
    FlashcardComponent,
    MessagesComponent,
    AddCardComponent,
    ForumsComponent,
    CameraViewComponent,
    ContinuePageComponent,
    FinalConfirmComponent,
    SettingsComponent,
    EditCardComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
