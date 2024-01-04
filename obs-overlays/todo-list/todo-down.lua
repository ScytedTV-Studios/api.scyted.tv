obs = obslua

source_name = "TODO Down"

function script_description()
    return "Toggle visibility of a folder source"
end

function toggle_visibility(pressed)
    local source = obs.obs_get_source_by_name(source_name)
    if source ~= nil then
        local active = obs.obs_source_active(source)
        obs.obs_source_set_enabled(source, not active)
        obs.obs_source_release(source)
    end
end

obs.obs_hotkey_register_frontend("toggle_folder_source", "Toggle Folder Source", toggle_visibility)

function script_unload()
    obs.obs_hotkey_unregister_by_name("toggle_folder_source")
end