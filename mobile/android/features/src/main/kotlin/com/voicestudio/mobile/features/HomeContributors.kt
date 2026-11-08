package com.voicestudio.mobile.features

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import com.voicestudio.mobile.designsystem.*

/** Fork-owned maintainer identity; historical authors remain in licence notices. */
object HomeContributors {
    const val REPOSITORY = "https://github.com/DevTunaSoft/VoiceBlueprint-Pro"
    val logins: List<String> = emptyList()
    val coreMaintainers: Set<String> = emptySet()
}

@Composable fun ContributorCluster() = ContributorPanel()
@Composable fun ContributorStrip() = ContributorPanel()

@Composable private fun ContributorPanel() {
    val uri = LocalUriHandler.current
    Column(
        Modifier.width(112.dp).testTag("home.contributors"),
        horizontalAlignment = Alignment.End,
        verticalArrangement = Arrangement.spacedBy(4.dp)
    ) {
        Text("DevTunaSoft", style = MaterialTheme.typography.labelSmall,
            color = role("textMuted"), modifier = Modifier.testTag("home.contributors.credit"))
        TextButton(
            onClick = { uri.openUri(HomeContributors.REPOSITORY) },
            modifier = Modifier.heightIn(min = 48.dp).testTag("home.project-link")
        ) { Text("Project") }
    }
}
