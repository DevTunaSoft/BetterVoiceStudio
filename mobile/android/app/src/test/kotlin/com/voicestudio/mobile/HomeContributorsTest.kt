package com.voicestudio.mobile

import android.app.Application
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.platform.UriHandler
import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.test.core.app.ApplicationProvider
import com.voicestudio.mobile.designsystem.*
import com.voicestudio.mobile.features.*
import com.voicestudio.mobile.l10n.L10n
import org.junit.Assert.*
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config

@RunWith(RobolectricTestRunner::class)
@Config(sdk=[34],qualifiers="w320dp-h640dp")
class HomeContributorsTest {
    @get:Rule val compose=createComposeRule()
    private val app get()=ApplicationProvider.getApplicationContext<Application>()
    private val opened=mutableListOf<String>()
    private val links=object:UriHandler {override fun openUri(uri:String) {opened+=uri}}
    @Composable private fun Content(content:@Composable ()->Unit) {
        CompositionLocalProvider(LocalL10n provides L10n.load(app,"en"),LocalUriHandler provides links) {
            VoiceStudioTheme(ThemePreferences(mode="dark")) {content()}
        }
    }
    @Test fun homeCreditsIdentifyIndependentDeveloper() {
        compose.setContent {Content {ContributorStrip()}}
        compose.onNodeWithText("DevTunaSoft").assertExists()
        compose.onNodeWithTag("home.project-link").assertHeightIsAtLeast(androidx.compose.ui.unit.Dp(48f)).performClick()
        assertEquals(listOf(HomeContributors.REPOSITORY),opened)
        assertTrue(HomeContributors.coreMaintainers.isEmpty())
        assertTrue(HomeContributors.logins.isEmpty())
    }
    @Test fun homeHeroRetainsForkOwnedCredits() {
        compose.setContent {Content {HomeHero()}}
        compose.onNodeWithText("DevTunaSoft").assertExists()
        compose.onNodeWithTag("home.contributors").assertExists()
    }
}
