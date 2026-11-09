package com.voicestudio.mobile.features.settings

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import com.voicestudio.mobile.designsystem.*
import com.voicestudio.mobile.features.*

private const val PROJECT_URL = "https://github.com/DevTunaSoft/VoiceBlueprint-Pro"

@Composable fun SupportSettingsLinks(navigate:(String)->Unit) {
    Group {
        listOf("donate" to "Project", "pro" to "Licensing", "other-apps" to "About").forEachIndexed {index,(route,label) ->
            if(index>0) HorizontalDivider(color=role("border"))
            Surface(onClick={navigate(route)},color=role("surface"),shape=MaterialTheme.shapes.small,
                modifier=Modifier.fillMaxWidth().heightIn(min=48.dp).testTag("settings.$route")) {
                Row(Modifier.padding(VSTheme.inset),verticalAlignment=Alignment.CenterVertically,horizontalArrangement=Arrangement.spacedBy(VSTheme.gap)) {
                    Icon(Icons.Default.Info,null,Modifier.size(20.dp),tint=role("messageAction"))
                    Text(label,Modifier.weight(1f))
                    Icon(Icons.AutoMirrored.Filled.ArrowForward,null,Modifier.size(20.dp),tint=role("textMuted"))
                }
            }
        }
    }
}

@Composable private fun SupportPage(title:String,tag:String,content:@Composable ColumnScope.()->Unit) {
    Screen {
        Column(Modifier.widthIn(max=840.dp).fillMaxWidth().align(Alignment.CenterHorizontally).testTag(tag),
            verticalArrangement=Arrangement.spacedBy(VSTheme.gap)) {
            ScreenTitle(title)
            content()
        }
    }
}

@Composable fun DonateScreen() {
    val uri=LocalUriHandler.current
    SupportPage("VoiceBlueprint Pro","support.donate") {
        Text("Design. Clone. Create.",style=MaterialTheme.typography.headlineSmall)
        Text("An independent, local-first AI voice production project maintained by DevTunaSoft contributors.")
        Text("No official donations, sponsors, or payment accounts are available for this fork.")
        TextButton(onClick={uri.openUri(PROJECT_URL)},modifier=Modifier.fillMaxWidth().heightIn(min=48.dp).testTag("support.project.github")) {
            Text("VoiceBlueprint Pro on GitHub")
            Spacer(Modifier.width(VSTheme.gap))
            Icon(Icons.AutoMirrored.Filled.ArrowForward,null)
        }
    }
}

@Composable fun ProScreen() {
    SupportPage("VoiceBlueprint Pro licensing","support.pro") {
        Text("VoiceBlueprint Pro does not sell the original project's Pro plans or commercial licences.")
        Text("The application, models, engines, and bundled components may have different open-source licence terms.")
        Text("No paid VoiceBlueprint Pro checkout or subscription is offered.")
    }
}

@Composable fun OtherAppsScreen() {
    SupportPage("About VoiceBlueprint Pro","support.other-apps") {
        Text("Developed independently by DevTunaSoft contributors.")
        Text("The original project's apps, sponsors, social accounts, and businesses are not affiliated with VoiceBlueprint Pro.")
        Text("Visit the VoiceBlueprint Pro GitHub repository for project information.")
    }
}
